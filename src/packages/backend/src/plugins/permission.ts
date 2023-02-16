
import { createRouter } from '@backstage/plugin-permission-backend';
import {
    AuthorizeResult,
    PolicyDecision,
} from '@backstage/plugin-permission-common';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import {
    PermissionPolicy,
    PolicyQuery,
} from '@backstage/plugin-permission-node';
import { DefaultIdentityClient } from '@backstage/plugin-auth-node';

class TestPermissionPolicy implements PermissionPolicy {
    async handle(request: PolicyQuery): Promise<PolicyDecision> {
        if (request.permission.name === 'catalog.entity.delete') {
            return {
                result: AuthorizeResult.ALLOW,
            };
        }

        return { result: AuthorizeResult.ALLOW };
    }
}

export default async function createPlugin(
    env: PluginEnvironment,
): Promise<Router> {
    return await createRouter({
        config: env.config,
        logger: env.logger,
        discovery: env.discovery,
        policy: new TestPermissionPolicy(),
        identity: DefaultIdentityClient.create({
            discovery: env.discovery,
            issuer: await env.discovery.getExternalBaseUrl('auth'),
        }),
    });
}