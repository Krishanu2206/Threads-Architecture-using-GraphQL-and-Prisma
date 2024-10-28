import { ApolloServer } from "@apollo/server";
import {User} from './user/index';

async function createApolloGraphQLServer() {
    //create gql server 
    const gqlserver = new ApolloServer({
    typeDefs : `
        ${User.typedefs}
        type Query {
            ${User.queries}
        },
        type Mutation {
            ${User.mutations}
        }
    `, //schemas
    resolvers : {
        Query : {
            ...User.resolvers.queries,
        },
        Mutation : {
            ...User.resolvers.mutations,
            
        }
    },
    });

    await gqlserver.start();

    return gqlserver;

}

export default createApolloGraphQLServer;