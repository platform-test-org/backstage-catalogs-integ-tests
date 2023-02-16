import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubEntityProvider, GithubLocationAnalyzer } from '@backstage/plugin-catalog-backend-module-github';

export default async function createPlugin(
    env: PluginEnvironment,
): Promise<Router> {
    const builder = await CatalogBuilder.create(env);
    builder.addEntityProvider(
        GithubEntityProvider.fromConfig(env.config, {
            logger: env.logger,
            schedule: env.scheduler.createScheduledTaskRunner({
                frequency: { minutes: 60 },
                timeout: { minutes: 10 },
            })
        }),
    );

    builder.addLocationAnalyzers(
        new GithubLocationAnalyzer({
            discovery: env.discovery,
            config: env.config,
            tokenManager: env.tokenManager,
        }),
    );
    builder.addProcessor(new ScaffolderEntitiesProcessor());
    const { processingEngine, router } = await builder.build();
    await processingEngine.start();
    return router;
}
