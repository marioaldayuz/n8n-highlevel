declare global {
	function describe(description: string, fn: () => void): void;
	function it(description: string, fn: () => void | Promise<void>): void;
	function beforeEach(fn: () => void | Promise<void>): void;
	function expect(actual: any): any;
	
	namespace jest {
		interface Mock {
			mockResolvedValue(value: any): Mock;
			mockRejectedValue(value: any): Mock;
		}
		function fn(): Mock;
	}
}

export {}; 