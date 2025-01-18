import { z } from 'zod';

export const PermissionTypeEnum = z.enum([
  'CREATE_WORKSPACE',
  'DELETE_WORKSPACE',
  'UPDATE_WORKSPACE',
  'VIEW_WORKSPACE',
  'CREATE_PROJECT',
  'DELETE_PROJECT',
  'UPDATE_PROJECT',
  'VIEW_PROJECT',
  'ADD_MEMBER',
  'REMOVE_MEMBER',
  'UPDATE_MEMBER',
  'VIEW_MEMBER',
  'CREATE_FORM',
  'DELETE_FORM',
  'UPDATE_FORM',
  'VIEW_FORM',
  'SUBMIT_FORM',
]);

export type PermissionType = z.infer<typeof PermissionTypeEnum>;

export const RoleTypeEnum = z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']);
export type RoleType = z.infer<typeof RoleTypeEnum>;

export const RolePermissions: Record<RoleType, PermissionType[]> = {
  OWNER: [
    'CREATE_WORKSPACE',
    'DELETE_WORKSPACE',
    'UPDATE_WORKSPACE',
    'VIEW_WORKSPACE',
    'CREATE_PROJECT',
    'DELETE_PROJECT',
    'UPDATE_PROJECT',
    'VIEW_PROJECT',
    'ADD_MEMBER',
    'REMOVE_MEMBER',
    'UPDATE_MEMBER',
    'VIEW_MEMBER',
    'CREATE_FORM',
    'DELETE_FORM',
    'UPDATE_FORM',
    'VIEW_FORM',
    'SUBMIT_FORM',
  ],
  ADMIN: [
    'CREATE_PROJECT',
    'DELETE_PROJECT',
    'UPDATE_PROJECT',
    'VIEW_PROJECT',
    'ADD_MEMBER',
    'REMOVE_MEMBER',
    'UPDATE_MEMBER',
    'VIEW_MEMBER',
    'CREATE_FORM',
    'DELETE_FORM',
    'UPDATE_FORM',
    'VIEW_FORM',
    'SUBMIT_FORM',
  ],
  MEMBER: [
    'VIEW_PROJECT',
    'VIEW_MEMBER',
    'CREATE_FORM',
    'UPDATE_FORM',
    'VIEW_FORM',
    'SUBMIT_FORM',
  ],
  GUEST: [
    'VIEW_PROJECT',
    'VIEW_FORM',
    'SUBMIT_FORM',
  ],
};
