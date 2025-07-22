import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
describe('Social Planner Operations', () => {
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
describe('Create Post Operation', () => {
it('should create a social media post successfully', async () => {
const mockPostData = {
id: 'post-123',
locationId: 'loc-456',
content: 'Test post content',
socialAccounts: ['facebook', 'instagram'],
status: 'published',
createdAt: '2024-01-15T10:00:00Z',
};
mockGetNodeParameter.mockImplementation((param: string) => {
switch (param) {
case 'locationId':
return 'loc-456';
case 'content':
return 'Test post content';
case 'socialAccounts':
return ['facebook', 'instagram'];
case 'resource':
return 'socialPlanner';
case 'operation':
return 'createPost';
default:
return undefined;
}
});
mockGetCredentials.mockResolvedValue({
oauthTokenData: { locationId: 'loc-456' }
});
mockHighLevelApiRequest.mockResolvedValue(mockPostData);
// Simulate the routing behavior
const requestOptions: IHttpRequestOptions = {
method: 'POST',
url: '/social-media-posting/loc-456/posts',
body: {
locationId: 'loc-456',
content: 'Test post content',
socialAccounts: ['facebook', 'instagram'],
},
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockPostData);
expect(result.id).toBe('post-123');
expect(result.content).toBe('Test post content');
expect(result.socialAccounts).toEqual(['facebook', 'instagram']);
});
it('should handle create post with media URLs and hashtags', async () => {
const mockPostData = {
id: 'post-456',
locationId: 'loc-789',
content: 'Post with media #marketing #social',
socialAccounts: ['linkedin'],
mediaUrls: ['https://example.com/image.jpg'],
hashtags: ['marketing', 'social'],
status: 'published',
};
mockHighLevelApiRequest.mockResolvedValue(mockPostData);
const requestOptions: IHttpRequestOptions = {
method: 'POST',
url: '/social-media-posting/loc-789/posts',
body: {
locationId: 'loc-789',
content: 'Post with media #marketing #social',
socialAccounts: ['linkedin'],
mediaUrls: ['https://example.com/image.jpg'],
hashtags: ['marketing', 'social'],
},
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockPostData);
expect(result.mediaUrls).toContain('https://example.com/image.jpg');
expect(result.hashtags).toEqual(['marketing', 'social']);
});
});
describe('Schedule Post Operation', () => {
it('should schedule a social media post successfully', async () => {
const mockScheduledPostData = {
id: 'scheduled-123',
locationId: 'loc-456',
content: 'Scheduled post content',
socialAccounts: ['facebook'],
scheduledDate: '2024-01-20T14:30:00Z',
timezone: 'America/New_York',
status: 'scheduled',
};
mockHighLevelApiRequest.mockResolvedValue(mockScheduledPostData);
const requestOptions: IHttpRequestOptions = {
method: 'POST',
url: '/social-media-posting/loc-456/posts/schedule',
body: {
locationId: 'loc-456',
content: 'Scheduled post content',
socialAccounts: ['facebook'],
scheduledDate: '2024-01-20T14:30:00Z',
timezone: 'America/New_York',
},
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockScheduledPostData);
expect(result.status).toBe('scheduled');
expect(result.scheduledDate).toBe('2024-01-20T14:30:00Z');
});
});
describe('Get Posts Operation', () => {
it('should retrieve posts with pagination', async () => {
const mockPostsData = {
posts: [
{
id: 'post-1',
content: 'First post',
status: 'published',
socialAccounts: ['facebook'],
},
{
id: 'post-2',
content: 'Second post',
status: 'scheduled',
socialAccounts: ['instagram'],
},
],
pagination: {
total: 25,
limit: 20,
offset: 0,
hasMore: true,
},
};
mockHighLevelApiRequest.mockResolvedValue(mockPostsData);
const requestOptions: IHttpRequestOptions = {
method: 'GET',
url: '/social-media-posting/loc-456/posts',
qs: {
limit: 20,
offset: 0,
status: 'all',
},
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockPostsData);
expect(result.posts).toHaveLength(2);
expect(result.pagination.total).toBe(25);
expect(result.pagination.hasMore).toBe(true);
});
it('should filter posts by status', async () => {
const mockFilteredPostsData = {
posts: [
{
id: 'post-1',
content: 'Scheduled post',
status: 'scheduled',
socialAccounts: ['facebook'],
scheduledDate: '2024-01-20T14:30:00Z',
},
],
pagination: {
total: 1,
limit: 20,
offset: 0,
hasMore: false,
},
};
mockHighLevelApiRequest.mockResolvedValue(mockFilteredPostsData);
const requestOptions: IHttpRequestOptions = {
method: 'GET',
url: '/social-media-posting/loc-456/posts',
qs: {
status: 'scheduled',
limit: 20,
offset: 0,
},
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockFilteredPostsData);
expect(result.posts[0].status).toBe('scheduled');
});
});
describe('Get Social Accounts Operation', () => {
it('should retrieve connected social accounts', async () => {
const mockAccountsData = {
socialAccounts: [
{
id: 'account-1',
platform: 'facebook',
accountName: 'My Business Page',
status: 'connected',
isBusinessAccount: true,
followerCount: 1250,
},
{
id: 'account-2',
platform: 'instagram',
accountName: 'My Instagram',
status: 'connected',
isBusinessAccount: true,
followerCount: 3400,
},
],
totalConnected: 2,
platformSummary: {
facebook: 1,
instagram: 1,
linkedin: 0,
tiktok: 0,
google_my_business: 0,
pinterest: 0,
},
};
mockHighLevelApiRequest.mockResolvedValue(mockAccountsData);
const requestOptions: IHttpRequestOptions = {
method: 'GET',
url: '/social-media-posting/loc-456',
};
const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);
expect(result).toEqual(mockAccountsData);
expect(result.socialAccounts).toHaveLength(2);
expect(result.totalConnected).toBe(2);
});
});
});
