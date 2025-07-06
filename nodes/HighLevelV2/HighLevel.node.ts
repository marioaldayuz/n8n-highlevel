import type { INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';
import { VersionedNodeType } from 'n8n-workflow';

import { HighLevelV2 } from './v2/HighLevelV2.node';

export class HighLevel extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'HighLevel v2',
			name: 'highLevelv2',
			icon: 'file:highLevel.svg',
			group: ['transform'],
			defaultVersion: 2,
			description: 'For utilizing the HighLevel API v2 by Mario Aldayuz. This is a fork of the original HighLevel node. This is a work in progress and is not yet ready for production. Submit isues here: https://github.com/marioaldayuz/n8n-highlevel/issues',
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			2: new HighLevelV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
