import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MediaFile } from './types';
import { enhancePhotoWithDimensions } from './photos';

// Mock fetch directly for this test suite
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

const mockMediaFile: MediaFile = {
  id: '1',
  ext: '.jpg',
  provider_metadata: {
    public_id: 'test-image',
  },
} as MediaFile;

const mockResponse = {
  output: { width: 800, height: 600 },
};

describe('lib/photos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should construct correct Cloudinary URLs', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    } as Response);

    await enhancePhotoWithDimensions(mockMediaFile);

    // Verify the correct Cloudinary URL was called
    expect(mockFetch).toHaveBeenCalledWith(
      'https://res.cloudinary.com/test-cloud/image/upload/fl_getinfo/test-image.jpg'
    );
  });
});
