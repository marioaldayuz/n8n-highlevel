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
import { NodeConnectionType } from 'n8n-workflow';

import { blogFields, blogOperations } from './description/BlogDescription';
import { calendarFields, calendarOperations } from './description/CalendarDescription';
import { contactFields, contactNotes, contactOperations } from './description/ContactDescription';
import { conversationFields, conversationOperations } from './description/ConversationDescription';
import { couponFields, couponOperations } from './description/CouponDescription';
import { customFieldFields, customFieldOperations } from './description/CustomFieldDescription';
import { customObjectsFields, customObjectsOperations } from './description/CustomObjectsDescription';
import { objectAssociationsFields, objectAssociationsOperations } from './description/ObjectAssociationsDescription';
import { productFields, productOperations } from './description/ProductDescription';
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
				name: 'Coupon',
				value: 'coupon',
			},
			{
				name: 'Custom Field',
				value: 'customField',
			},
			{
				name: 'Custom Objects',
				value: 'customObjects',
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
				name: 'Object Associations',
				value: 'objectAssociations',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
			{
				name: 'Product',
				value: 'product',
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
	displayName: 'HighLevel v2',
	name: 'highLevelv2',
	icon: 'file:highLevel.svg',
	group: ['transform'],
	version: 2,
	description: 'For utilizing the HighLevel API v2 by Mario Aldayuz. This is a fork of the original HighLevel node. This is a work in progress and is not yet ready for production. Submit isues here: https://github.com/marioaldayuz/n8n-highlevel/issues',
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	defaults: {
		name: 'HighLevel v2',
	},
	usableAsTool: true,
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
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
		...couponOperations,
		...couponFields,
		...customFieldOperations,
		...customFieldFields,
		...customObjectsOperations,
		...customObjectsFields,
		...emailOperations,
		...emailFields,
		...formOperations,
		...formFields,
		...objectAssociationsOperations,
		...objectAssociationsFields,
		...opportunityOperations,
		...opportunityFields,
		...productOperations,
		...productFields,
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
