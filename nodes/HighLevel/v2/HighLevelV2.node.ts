import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
	INodeProperties,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { blogFields, blogOperations } from './description/BlogDescription';
import { calendarFields, calendarOperations } from './description/CalendarDescription';
import { contactFields, contactNotes, contactOperations } from './description/ContactDescription';
import { conversationFields, conversationOperations } from './description/ConversationDescription';
import { customFieldFields, customFieldOperations } from './description/CustomFieldDescription';
import { emailFields, emailOperations } from './description/EmailDescription';
import { formFields, formOperations } from './description/FormDescription';
import { opportunityFields, opportunityOperations } from './description/OpportunityDescription';
import { saasFields, saasOperations } from './description/SaaSDescription';
import { socialPlannerFields, socialPlannerOperations } from './description/SocialPlannerDescription';
import { subAccountFields, subAccountOperations } from './description/SubAccountDescription';
import { surveyFields, surveyOperations } from './description/SurveyDescription';
import { taskFields, taskOperations } from './description/TaskDescription';
import { userFields, userOperations } from './description/UserDescription';
import { authFields, authOperations } from './description/AuthDescription';
import {
	getContacts,
	getPipelines,
	getPipelineStages,
	getSocialAccounts,
	getSubAccounts,
	getUsers,
	highLevelApiPagination,
} from './GenericFunctions';

const resources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Auth',
				value: 'auth',
			},
			{
				name: 'Blog',
				value: 'blog',
			},
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Conversation',
				value: 'conversation',
			},
			{
				name: 'Custom Field',
				value: 'customField',
			},
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'Form',
				value: 'form',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
			{
				name: 'SaaS',
				value: 'saas',
			},
			{
				name: 'Task',
				value: 'task',
			},
			{
				name: 'Calendar',
				value: 'calendar',
			},
			{
				name: 'Social Planner',
				value: 'socialPlanner',
			},
			{
				name: 'Sub-Account',
				value: 'subAccount',
			},
			{
				name: 'Survey',
				value: 'survey',
			},
			{
				name: 'User',
				value: 'user',
			},
		],
		default: 'contact',
		required: true,
	},
];

const versionDescription: INodeTypeDescription = {
	displayName: 'HighLevel',
	name: 'highLevel',
	icon: 'file:highLevel.svg',
	group: ['transform'],
	version: 2,
	description: 'Consume HighLevel API v2',
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	defaults: {
		name: 'HighLevel',
	},
	usableAsTool: true,
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
	credentials: [
		{
			name: 'highLevelOAuth2Api',
			required: true,
		},
	],
	requestDefaults: {
		baseURL: 'https://services.leadconnectorhq.com',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Version: '2021-07-28',
		},
	},
	requestOperations: {
		pagination: highLevelApiPagination,
	},
	routing: {
		request: {
			method: '={{$parameter["operation"] === "getLocationAccessToken" ? "POST" : "GET"}}',
			url: '={{$parameter["resource"] === "auth" && $parameter["operation"] === "getLocationAccessToken" ? "/oauth/locationToken" : "/" + $parameter["resource"]}}',
		},
		operations: {
			auth: {
				getLocationAccessToken: {
					requestMethod: 'POST',
					basePath: '/oauth/locationToken',
					requestBodyFormat: 'json',
				},
			},
			customField: {
				create: {
					requestMethod: 'POST',
					basePath: '=/locations/{{$parameter.locationId}}/customFields',
					requestBodyFormat: 'json',
				},
				update: {
					requestMethod: 'PUT',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/{{$parameter.customFieldId}}',
					requestBodyFormat: 'json',
				},
				delete: {
					requestMethod: 'DELETE',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/{{$parameter.customFieldId}}',
				},
				getAll: {
					requestMethod: 'GET',
					basePath: '=/locations/{{$parameter.locationId}}/customFields',
				},
				createFolder: {
					requestMethod: 'POST',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/folders',
					requestBodyFormat: 'json',
				},
				getFolder: {
					requestMethod: 'GET',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
				},
				updateFolder: {
					requestMethod: 'PUT',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
					requestBodyFormat: 'json',
				},
				deleteFolder: {
					requestMethod: 'DELETE',
					basePath: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
				},
			},
		},
	},
	properties: [
		...resources,
		...authOperations,
		...authFields,
		...blogOperations,
		...blogFields,
		...contactOperations,
		...contactNotes,
		...contactFields,
		...conversationOperations,
		...conversationFields,
		...customFieldOperations,
		...customFieldFields,
		...emailOperations,
		...emailFields,
		...formOperations,
		...formFields,
		...opportunityOperations,
		...opportunityFields,
		...saasOperations,
		...saasFields,
		...taskOperations,
		...taskFields,
		...calendarOperations,
		...calendarFields,
		...socialPlannerOperations,
		...socialPlannerFields,
		...subAccountOperations,
		...subAccountFields,
		...surveyOperations,
		...surveyFields,
		...userOperations,
		...userFields,
	],
};

export class HighLevelV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = {
		loadOptions: {
			getPipelines,
			getContacts,
			getPipelineStages,
			getSocialAccounts,
			getSubAccounts,
			getUsers,
		},
		listSearch: {
			async searchCustomFields(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				const { locationId } =
					((await this.getCredentials('highLevelOAuth2Api'))?.oauthTokenData as IDataObject) ?? {};

				const responseData: IDataObject = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'highLevelOAuth2Api',
					{
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						url: `https://services.leadconnectorhq.com/locations/${locationId}/customFields?model=contact`,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Version: '2021-07-28',
						},
					},
				)) as IDataObject;

				const customFields = responseData.customFields as Array<{ name: string; id: string }>;

				const results: INodeListSearchItems[] = customFields
					.map((a) => ({
						name: a.name,
						value: a.id,
					}))
					.filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase()))
					.sort((a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						return 0;
					});

				return { results };
			},
			async searchTimezones(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				const { locationId } =
					((await this.getCredentials('highLevelOAuth2Api'))?.oauthTokenData as IDataObject) ?? {};

				const responseData: IDataObject = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'highLevelOAuth2Api',
					{
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						url: `https://services.leadconnectorhq.com/locations/${locationId}/timezones`,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Version: '2021-07-28',
						},
					},
				)) as IDataObject;

				const timezones = responseData.timeZones as string[];

				const results: INodeListSearchItems[] = timezones
					.map((zone) => ({
						name: zone.trim(),
						value: zone.trim(),
					}))
					.filter((zone) => !filter || zone.name.toLowerCase().includes(filter.toLowerCase()))
					.sort((a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						return 0;
					});

				return { results };
			},
		},
	};


}
