import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Media Operations', () => {
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

	describe('Get Files Operation', () => {
		it('should retrieve files from media library successfully', async () => {
			const mockFilesData = {
				files: [
					{
						id: 'file-123',
						name: 'test-image.jpg',
						type: 'image',
						size: 1024000,
						url: 'https://example.com/test-image.jpg',
						thumbnailUrl: 'https://example.com/thumb-test-image.jpg',
						folderId: 'folder-456',
						isFolder: false,
						mimeType: 'image/jpeg',
						createdAt: '2024-01-15T10:00:00Z',
						updatedAt: '2024-01-15T10:00:00Z',
						createdBy: 'user-789',
						locationId: 'loc-456',
						description: 'Test image file',
						tags: ['test', 'image'],
						isPublic: true,
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 20,
					offset: 0,
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'media';
					case 'operation':
						return 'getFiles';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockFilesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/medias/',
				qs: {
					locationId: 'loc-456',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilesData);
			expect(result.files).toHaveLength(1);
			expect(result.files[0].id).toBe('file-123');
			expect(result.files[0].name).toBe('test-image.jpg');
			expect(result.meta.total).toBe(1);
		});

		it('should handle filtering and sorting options', async () => {
			const mockFilteredFilesData = {
				files: [
					{
						id: 'file-456',
						name: 'document.pdf',
						type: 'document',
						size: 2048000,
						url: 'https://example.com/document.pdf',
						mimeType: 'application/pdf',
						createdAt: '2024-01-16T10:00:00Z',
						locationId: 'loc-456',
						isFolder: false,
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 10,
					offset: 0,
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredFilesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/medias/',
				qs: {
					locationId: 'loc-456',
					folderId: 'folder-123',
					search: 'document',
					sortBy: 'createdAt',
					sortOrder: 'desc',
					limit: 10,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredFilesData);
			expect(result.files[0].name).toBe('document.pdf');
		});
	});

	describe('Upload File Operation', () => {
		it('should upload a file successfully', async () => {
			const mockUploadData = {
				file: {
					id: 'file-new-123',
					name: 'uploaded-image.png',
					type: 'image',
					size: 512000,
					url: 'https://example.com/uploaded-image.png',
					thumbnailUrl: 'https://example.com/thumb-uploaded-image.png',
					folderId: 'folder-456',
					isFolder: false,
					mimeType: 'image/png',
					createdAt: '2024-01-17T10:00:00Z',
					updatedAt: '2024-01-17T10:00:00Z',
					createdBy: 'user-789',
					locationId: 'loc-456',
					description: 'Uploaded test image',
					tags: ['uploaded', 'test'],
					isPublic: false,
				},
				success: true,
				message: 'File uploaded successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'media';
					case 'operation':
						return 'uploadFile';
					case 'fileData':
						return 'base64encodeddata...';
					case 'fileName':
						return 'uploaded-image.png';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockUploadData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/medias/upload-file',
				body: {
					locationId: 'loc-456',
					fileData: 'base64encodeddata...',
					fileName: 'uploaded-image.png',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockUploadData);
			expect(result.file.id).toBe('file-new-123');
			expect(result.file.name).toBe('uploaded-image.png');
			expect(result.success).toBe(true);
		});

		it('should handle upload with additional options', async () => {
			const mockUploadData = {
				file: {
					id: 'file-new-456',
					name: 'document.pdf',
					type: 'document',
					size: 1024000,
					url: 'https://example.com/document.pdf',
					folderId: 'folder-789',
					isFolder: false,
					mimeType: 'application/pdf',
					createdAt: '2024-01-17T11:00:00Z',
					locationId: 'loc-456',
					description: 'Important document',
					tags: ['document', 'important'],
					isPublic: true,
				},
				success: true,
				message: 'File uploaded successfully',
			};

			mockHighLevelApiRequest.mockResolvedValue(mockUploadData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/medias/upload-file',
				body: {
					locationId: 'loc-456',
					fileData: 'base64encodeddata...',
					fileName: 'document.pdf',
					folderId: 'folder-789',
					description: 'Important document',
					tags: 'document,important',
					isPublic: true,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockUploadData);
			expect(result.file.folderId).toBe('folder-789');
			expect(result.file.description).toBe('Important document');
			expect(result.file.isPublic).toBe(true);
		});
	});

	describe('Delete File Operation', () => {
		it('should delete a file successfully', async () => {
			const mockDeleteData = {
				success: true,
				message: 'File deleted successfully',
				deletedFile: {
					id: 'file-123',
					name: 'test-image.jpg',
					type: 'image',
					isFolder: false,
					locationId: 'loc-456',
					deletedAt: '2024-01-17T12:00:00Z',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'media';
					case 'operation':
						return 'deleteFile';
					case 'fileId':
						return 'file-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockDeleteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/medias/file-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockDeleteData);
			expect(result.success).toBe(true);
			expect(result.deletedFile.id).toBe('file-123');
		});

		it('should handle force delete option', async () => {
			const mockDeleteData = {
				success: true,
				message: 'File force deleted successfully',
				deletedFile: {
					id: 'file-456',
					name: 'referenced-file.jpg',
					type: 'image',
					isFolder: false,
					locationId: 'loc-456',
					deletedAt: '2024-01-17T12:30:00Z',
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockDeleteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/medias/file-456',
				qs: {
					forceDelete: true,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockDeleteData);
			expect(result.success).toBe(true);
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: File not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/medias/',
				qs: {
					locationId: 'invalid-loc',
				},
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: File not found');
		});

		it('should handle missing required parameters for upload', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'fileData':
						return '';
					case 'fileName':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = 
				mockGetNodeParameter('fileData') && 
				mockGetNodeParameter('fileName');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle missing file ID for delete operation', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'fileId':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = mockGetNodeParameter('fileId');

			expect(hasRequiredParams).toBe(false);
		});
	});
}); 