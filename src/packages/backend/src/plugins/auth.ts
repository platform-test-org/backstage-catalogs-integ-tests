import {
  createRouter,
  providers,
  defaultAuthProviderFactories,
} from '@backstage/plugin-auth-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import {
  DEFAULT_NAMESPACE,
  stringifyEntityRef,
} from '@backstage/catalog-model';
export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    tokenManager: env.tokenManager,
    providerFactories: {
      ...defaultAuthProviderFactories,
      google: providers.google.create({
        signIn: {
          resolver: async ({profile}, ctx) => {
            if (!profile.email) {
              throw new Error(
                'Login failed, user profile does not contain an email',
              );
            }
            
            // Add here domains to white list in sign in
            const knowDomains = ['pagar.me', 'stone.com.br', 'buy4.io'];

            // Split the email into the local part and the domain.
            const [localPart, domain] = profile.email.split('@');

              // Next we verify the email domain. It is recommended to include this
              // kind of check if you don't look up the user in an external service.
              if (!knowDomains.includes(domain)) {
                throw new Error(
                  `Login failed, this email ${profile.email} does not belong to the expected domain`,
                );
              }

            // By using `stringifyEntityRef` we ensure that the reference is formatted correctly
            const userEntity = stringifyEntityRef({
              kind: 'User',
              name: localPart,
              namespace: DEFAULT_NAMESPACE,
            });
            return ctx.issueToken({
              claims: {
                sub: userEntity,
                ent: [userEntity],
              },
            });
          },
        },
      }),
      github: providers.github.create({
        signIn: {
          resolver(info, ctx) {
            const { profile } = info;
            const { displayName } = profile;
            const userRef = `user:default/${displayName}`; // Must be a full entity reference

            return ctx.issueToken({
              claims: {
                sub: userRef, // The user's own identity
                ent: [userRef], // A list of identities that the user claims ownership through
              },
            });
          }
        },
      }),
    },
  });
}
