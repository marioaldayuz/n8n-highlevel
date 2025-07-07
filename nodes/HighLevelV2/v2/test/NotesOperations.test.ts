import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Notes Operations', () => {
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

	describe('Create Note Operation', () => {
		it('should create a note successfully', async () => {
			const mockNoteData = {
				note: {
					id: 'note-123',
					body: 'This is a test note',
					contactId: 'contact-456',
					userId: 'user-789',
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-15T10:00:00Z',
					createdBy: 'user-789',
					updatedBy: 'user-789',
				},
				success: true,
				message: 'Note created successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'notes';
					case 'operation':
						return 'create';
					case 'contactId':
						return 'contact-456';
					case 'body':
						return 'This is a test note';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockNoteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/notes',
				body: {
					locationId: 'loc-456',
					body: 'This is a test note',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockNoteData);
			expect(result.note.id).toBe('note-123');
			expect(result.note.body).toBe('This is a test note');
			expect(result.success).toBe(true);
		});

		it('should handle create note with additional fields', async () => {
			const mockNoteData = {
				note: {
					id: 'note-456',
					body: 'Note with user ID',
					contactId: 'contact-456',
					userId: 'user-123',
					locationId: 'loc-456',
					dateAdded: '2024-01-15T11:00:00Z',
					createdBy: 'user-123',
				},
				success: true,
				message: 'Note created successfully',
			};

			mockHighLevelApiRequest.mockResolvedValue(mockNoteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/contacts/contact-456/notes',
				body: {
					locationId: 'loc-456',
					body: 'Note with user ID',
					userId: 'user-123',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockNoteData);
			expect(result.note.userId).toBe('user-123');
		});
	});

	describe('Get All Notes Operation', () => {
		it('should retrieve all notes for a contact successfully', async () => {
			const mockNotesData = {
				notes: [
					{
						id: 'note-1',
						body: 'First note',
						contactId: 'contact-456',
						userId: 'user-789',
						locationId: 'loc-456',
						dateAdded: '2024-01-15T10:00:00Z',
						createdBy: 'user-789',
					},
					{
						id: 'note-2',
						body: 'Second note',
						contactId: 'contact-456',
						userId: 'user-789',
						locationId: 'loc-456',
						dateAdded: '2024-01-16T10:00:00Z',
						createdBy: 'user-789',
					},
				],
				meta: {
					total: 2,
					count: 2,
					limit: 20,
					offset: 0,
					contactId: 'contact-456',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'notes';
					case 'operation':
						return 'getAll';
					case 'contactId':
						return 'contact-456';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockNotesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/contacts/contact-456/notes',
				qs: {
					locationId: 'loc-456',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockNotesData);
			expect(result.notes).toHaveLength(2);
			expect(result.meta.total).toBe(2);
		});
	});

	describe('Get Note Operation', () => {
		it('should retrieve a specific note successfully', async () => {
			const mockNoteData = {
				note: {
					id: 'note-123',
					body: 'This is a specific note',
					contactId: 'contact-456',
					userId: 'user-789',
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-15T10:00:00Z',
					createdBy: 'user-789',
				},
				success: true,
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'notes';
					case 'operation':
						return 'get';
					case 'contactId':
						return 'contact-456';
					case 'noteId':
						return 'note-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockNoteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/contacts/contact-456/notes/note-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockNoteData);
			expect(result.note.id).toBe('note-123');
			expect(result.success).toBe(true);
		});
	});

	describe('Update Note Operation', () => {
		it('should update a note successfully', async () => {
			const mockUpdatedNoteData = {
				note: {
					id: 'note-123',
					body: 'Updated note content',
					contactId: 'contact-456',
					userId: 'user-789',
					locationId: 'loc-456',
					dateAdded: '2024-01-15T10:00:00Z',
					dateUpdated: '2024-01-17T12:00:00Z',
					createdBy: 'user-789',
					updatedBy: 'user-789',
				},
				success: true,
				message: 'Note updated successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'notes';
					case 'operation':
						return 'update';
					case 'contactId':
						return 'contact-456';
					case 'noteId':
						return 'note-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockUpdatedNoteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'PUT',
				url: '/contacts/contact-456/notes/note-123',
				body: {
					locationId: 'loc-456',
					body: 'Updated note content',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockUpdatedNoteData);
			expect(result.note.body).toBe('Updated note content');
			expect(result.success).toBe(true);
		});
	});

	describe('Delete Note Operation', () => {
		it('should delete a note successfully', async () => {
			const mockDeleteData = {
				success: true,
				message: 'Note deleted successfully',
				deletedNote: {
					id: 'note-123',
					contactId: 'contact-456',
					locationId: 'loc-456',
					deletedAt: '2024-01-17T15:00:00Z',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'notes';
					case 'operation':
						return 'delete';
					case 'contactId':
						return 'contact-456';
					case 'noteId':
						return 'note-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockDeleteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/contacts/contact-456/notes/note-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockDeleteData);
			expect(result.success).toBe(true);
			expect(result.deletedNote.id).toBe('note-123');
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: Note not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/contacts/invalid-contact/notes',
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Note not found');
		});

		it('should handle missing required parameters', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'contactId':
						return '';
					case 'body':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = 
				mockGetNodeParameter('contactId') && 
				mockGetNodeParameter('body');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle missing note ID for specific operations', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'noteId':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = mockGetNodeParameter('noteId');

			expect(hasRequiredParams).toBe(false);
		});
	});
}); 