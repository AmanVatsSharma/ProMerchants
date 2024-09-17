import { createYoga } from 'graphql-yoga';
import { schema } from '../../src/graphql/schema';

const server = createYoga({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
});

export default server;