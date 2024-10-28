import express from 'express';
import createApolloGraphQLServer from './graphql';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { decodejwttoken } from './helpers/jwttoken';

async function init(){
    const app = express();
    const PORT : number = Number(process.env.PORT || 8000);

    app.use(cors());
    app.use(express.json());
    const gqlserver = await createApolloGraphQLServer();
    app.use('/graphql', expressMiddleware(gqlserver, {
            context: async ({ req }) => {
                const token = req.headers.authorization as string;
                try {
                    const user = await decodejwttoken(token);
                    if(!user) {throw new Error("Invalid token");}
                    return { user };
                } catch (error) {
                    return {};
                }
            }
        })
    );

    app.get('/', (req, res) => {
        res.json({message : "Server is running on port " + PORT})
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

init();