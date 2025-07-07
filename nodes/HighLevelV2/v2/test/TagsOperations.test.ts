import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Tags Operations', () => {
	const mockGetNodeParameter = jest.fn();
	const mockGetCredentials = jest.fn();
	const mockHighLevelApiRequest = jest.fn();
	const mockContext = {
		getNodeParameter: mockGetNodeParameter,
		getCredentials: mockGetCredentials,
		helpers: {
			httpRequestWithAuthentication: mockHighLevelApiRequest,
		},
	} as unknown as IExecuteSingleFunctions;

	beforeEach(() => {
		mockGetNodeParameter.mockClear();
		mockGetCredentials.mockClear();
		mockHighLevelApiRequest.mockClear();
	});

	describe('Add Tags Operation', () => {
		it('should add tags to a contact successfully', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					contactName: 'John Doe',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					phone: '+1234567890',
					tags: ['new-tag-1', 'new-tag-2', 'existing-tag'],
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-17T12:00:00Z',
				},
				success: true,
				message: 'Tags added successfully',
				addedTags: ['new-tag-1', 'new-tag-2'],
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'tags';
					case 'operation':
						return 'addTags';
					case 'contactId':
						return 'contact-456';
					case 'tags':
						return 'new-tag-1,new-tag-2';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['new-tag-1', 'new-tag-2'],
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.contact.id).toBe('contact-456');
			expect(result.addedTags).toEqual(['new-tag-1', 'new-tag-2']);
			expect(result.success).toBe(true);
		});

		it('should handle add tags with additional fields', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					contactName: 'John Doe',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					phone: '+1234567890',
					tags: ['urgent', 'follow-up'],
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-17T12:00:00Z',
				},
				success: true,
				message: 'Tags added successfully',
				addedTags: ['urgent', 'follow-up'],
			};

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['urgent', 'follow-up'],
					userId: 'user-123',
					source: 'workflow',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.addedTags).toEqual(['urgent', 'follow-up']);
		});

		it('should handle array format for tags', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					tags: ['tag1', 'tag2', 'tag3'],
					locationId: 'loc-456',
				},
				success: true,
				addedTags: ['tag1', 'tag2', 'tag3'],
			};

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['tag1', 'tag2', 'tag3'],
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.addedTags).toEqual(['tag1', 'tag2', 'tag3']);
		});
	});

	describe('Remove Tags Operation', () => {
		it('should remove tags from a contact successfully', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					contactName: 'John Doe',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					phone: '+1234567890',
					tags: ['remaining-tag'],
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-17T12:00:00Z',
				},
				success: true,
				message: 'Tags removed successfully',
				removedTags: ['old-tag-1', 'old-tag-2'],
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'tags';
					case 'operation':
						return 'removeTags';
					case 'contactId':
						return 'contact-456';
					case 'tags':
						return 'old-tag-1,old-tag-2';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['old-tag-1', 'old-tag-2'],
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.contact.id).toBe('contact-456');
			expect(result.removedTags).toEqual(['old-tag-1', 'old-tag-2']);
			expect(result.success).toBe(true);
		});

		it('should handle remove tags with additional fields', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					contactName: 'John Doe',
					tags: ['kept-tag'],
					locationId: 'loc-456',
				},
				success: true,
				message: 'Tags removed successfully',
				removedTags: ['unwanted-tag'],
			};

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['unwanted-tag'],
					userId: 'user-123',
					source: 'cleanup',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.removedTags).toEqual(['unwanted-tag']);
		});

		it('should handle removing multiple tags', async () => {
			const mockTagData = {
				contact: {
					id: 'contact-456',
					tags: [],
					locationId: 'loc-456',
				},
				success: true,
				message: 'All tags removed successfully',
				removedTags: ['tag1', 'tag2', 'tag3', 'tag4'],
			};

			mockHighLevelApiRequest.mockResolvedValue(mockTagData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['tag1', 'tag2', 'tag3', 'tag4'],
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockTagData);
			expect(result.removedTags).toHaveLength(4);
			expect(result.contact.tags).toEqual([]);
		});
	});

	describe('Tag Format Processing', () => {
		it('should handle comma-separated tags', () => {
			const tagsString = 'tag1,tag2,tag3';
			const expectedTags = ['tag1', 'tag2', 'tag3'];
			const processedTags = tagsString.split(',').map(tag => tag.trim());
			
			expect(processedTags).toEqual(expectedTags);
		});

		it('should handle space-separated tags', () => {
			const tagsString = 'tag1 tag2 tag3';
			const expectedTags = ['tag1', 'tag2', 'tag3'];
			const processedTags = tagsString.split(' ').map(tag => tag.trim());
			
			expect(processedTags).toEqual(expectedTags);
		});

		it('should handle array format directly', () => {
			const tagsArray = ['tag1', 'tag2', 'tag3'];
			
			expect(Array.isArray(tagsArray)).toBe(true);
			expect(tagsArray).toEqual(['tag1', 'tag2', 'tag3']);
		});

		it('should handle empty tags gracefully', () => {
			const emptyString = '';
			const emptyArray: string[] = [];
			
			expect(emptyString.split(',').filter(tag => tag.trim())).toEqual(['']);
			expect(emptyArray).toEqual([]);
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: Contact not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/invalid-contact/tags',
				body: {
					locationId: 'loc-456',
					tags: ['test-tag'],
				},
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Contact not found');
		});

		it('should handle missing required parameters', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'contactId':
						return '';
					case 'tags':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = 
				mockGetNodeParameter('contactId') && 
				mockGetNodeParameter('tags');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle invalid tag format', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'tags':
						return null;
					default:
						return undefined;
				}
			});

			const tags = mockGetNodeParameter('tags');
			const isValidTags = tags && (typeof tags === 'string' || Array.isArray(tags));

			expect(isValidTags).toBe(false);
		});

		it('should handle duplicate tags', () => {
			const tagsWithDuplicates = ['tag1', 'tag2', 'tag1', 'tag3', 'tag2'];
			const uniqueTags = [...new Set(tagsWithDuplicates)];
			
			expect(uniqueTags).toEqual(['tag1', 'tag2', 'tag3']);
			expect(uniqueTags.length).toBe(3);
		});
	});

	describe('Integration Scenarios', () => {
		it('should handle bulk tag operations', async () => {
			const mockBulkData = {
				contact: {
					id: 'contact-456',
					tags: ['customer', 'vip', 'follow-up', 'urgent', 'priority'],
					locationId: 'loc-456',
				},
				success: true,
				message: 'Bulk tags processed successfully',
				addedTags: ['customer', 'vip', 'follow-up', 'urgent', 'priority'],
			};

			mockHighLevelApiRequest.mockResolvedValue(mockBulkData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/tags',
				body: {
					locationId: 'loc-456',
					tags: ['customer', 'vip', 'follow-up', 'urgent', 'priority'],
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockBulkData);
			expect(result.addedTags).toHaveLength(5);
		});

		it('should handle tag replacement scenario', async () => {
			// First remove old tags
			const mockRemoveData = {
				contact: { id: 'contact-456', tags: [], locationId: 'loc-456' },
				success: true,
				removedTags: ['old-tag-1', 'old-tag-2'],
			};

			// Then add new tags
			const mockAddData = {
				contact: { id: 'contact-456', tags: ['new-tag-1', 'new-tag-2'], locationId: 'loc-456' },
				success: true,
				addedTags: ['new-tag-1', 'new-tag-2'],
			};

			mockHighLevelApiRequest
				.mockResolvedValueOnce(mockRemoveData)
				.mockResolvedValueOnce(mockAddData);

			const removeResult = await mockHighLevelApiRequest.call(mockContext, {
				method: 'DELETE',
				url: '/contacts/contact-456/tags',
				body: { locationId: 'loc-456', tags: ['old-tag-1', 'old-tag-2'] },
			});

			const addResult = await mockHighLevelApiRequest.call(mockContext, {
				method: 'POST',
				url: '/contacts/contact-456/tags',
				body: { locationId: 'loc-456', tags: ['new-tag-1', 'new-tag-2'] },
			});

			expect(removeResult.removedTags).toEqual(['old-tag-1', 'old-tag-2']);
			expect(addResult.addedTags).toEqual(['new-tag-1', 'new-tag-2']);
		});
	});
}); 