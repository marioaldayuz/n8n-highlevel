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
			description: 'Consume HighLevel v2 API',
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			2: new HighLevelV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
