import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from 'src/modules/posts/post.entity';

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case 'development':
           config = databaseConfig.development;
           break;
        case 'test':
           config = databaseConfig.test;
           break;
        case 'production':
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Post]);
        await sequelize.sync();
        return sequelize;
    },
}];