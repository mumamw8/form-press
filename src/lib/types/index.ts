import { z } from "zod"
import { PermissionTypeEnum } from "../../../prisma/constants"
import { ZFormField } from "./form-types"

export const TeamSchema = z.object({
  id: z.string().cuid(),
  name: z.string().max(255).min(1, "A team name is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const WorkspaceSchema = z.object({
  id: z.string().cuid(),
  name: z.string().max(255).min(1, "A workspace name is required"),
  desc: z.string().nullable(),
  teamId: z.string(),
  inviteCode: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const RoleSchema = z.object({
  id: z.string().cuid(),
  name: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]),
  permissions: z.array(PermissionTypeEnum),
  // Add nested schemas for related models if needed
})

export const UserSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string().uuid(),
  email: z.string().email(),
  apiKey: z.string().uuid(),
  subscription: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const FormSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().default(""),
  fields: z.array(ZFormField).default([]), // Use z.any() for JSON content
  settings: z.record(z.any()).optional(), // JSON object
  isPublished: z.boolean().default(false),
  visits: z.number().default(0),
  submissions_count: z.number().default(0),
  shareURL: z.string().uuid(),
  createdById: z.string(),
  workspaceId: z.string(),
  teamId: z.string(),
  isArchived: z.boolean().default(false),
  closeFormDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const SubmissionSchema = z.object({
  id: z.string().cuid(),
  data: z.record(z.any()).default({}), // JSON object
  submittedAt: z.date(),
  formId: z.string(),
  // Add nested schemas for related models if needed
})

export const TeamMembershipSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  teamId: z.string(),
  joinedAt: z.date(),
  roleId: z.string(),
  // Add nested schemas for related models if needed
})

export const CreateTeamSchema = TeamSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTeamSchema = TeamSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const CreateWorkspaceSchema = WorkspaceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  // inviteCode: true,
})

export const UpdateWorkspaceSchema = WorkspaceSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  // inviteCode: true,
  teamId: true,
})

export const CreateRoleSchema = RoleSchema.omit({
  id: true,
})

export const UpdateRoleSchema = RoleSchema.partial().omit({
  id: true,
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  apiKey: true,
})

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  apiKey: true,
})

export const CreateFormSchema = FormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissions_count: true,
  visits: true,
  shareURL: true,
  createdById: true,
  fields: true,
})

export const UpdateFormSchema = FormSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissions_count: true,
  visits: true,
  shareURL: true,
  createdById: true,
})

export const CreateSubmissionSchema = SubmissionSchema.omit({
  id: true,
  submittedAt: true,
})

export const UpdateSubmissionSchema = SubmissionSchema.partial().omit({
  id: true,
  submittedAt: true,
  formId: true,
})

export const CreateTeamMembershipSchema = TeamMembershipSchema.omit({
  id: true,
  joinedAt: true,
})

export const UpdateTeamMembershipSchema = TeamMembershipSchema.partial().omit({
  id: true,
  joinedAt: true,
  teamId: true,
  userId: true,
})

export type CreateTeamType = z.infer<typeof CreateTeamSchema>
export type UpdateTeamType = z.infer<typeof UpdateTeamSchema>

export type CreateWorkspaceType = z.infer<typeof CreateWorkspaceSchema>
export type UpdateWorkspaceType = z.infer<typeof UpdateWorkspaceSchema>

export type CreateRoleType = z.infer<typeof CreateRoleSchema>
export type UpdateRoleType = z.infer<typeof UpdateRoleSchema>

export type CreateUserType = z.infer<typeof CreateUserSchema>
export type UpdateUserType = z.infer<typeof UpdateUserSchema>

export type CreateFormType = z.infer<typeof CreateFormSchema>
export type UpdateFormType = z.infer<typeof UpdateFormSchema>

export type CreateSubmissionType = z.infer<typeof CreateSubmissionSchema>
export type UpdateSubmissionType = z.infer<typeof UpdateSubmissionSchema>

export type CreateTeamMembershipType = z.infer<typeof CreateTeamMembershipSchema>
export type UpdateTeamMembershipType = z.infer<typeof UpdateTeamMembershipSchema>

export type TTeamMembership = z.infer<typeof TeamMembershipSchema>

export type TTeam = z.infer<typeof TeamSchema>
export type TWorkspace = z.infer<typeof WorkspaceSchema>
export type TRole = z.infer<typeof RoleSchema>
export type TUser = z.infer<typeof UserSchema>
export type TForm = z.infer<typeof FormSchema>
export type TSubmission = z.infer<typeof SubmissionSchema>
