// src/services/cloudinary.service.ts
import cloudinary from '../../config/cloudinary.config'
import streamifier from 'streamifier'

class CloudinaryService {
  async uploadImageBuffer(fileBuffer: Buffer, filename: string): Promise<any | null> {
    try {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'DhanaShree',
            resource_type: 'auto',
            public_id: filename,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error)
              return reject(error)
            }
            resolve(result)
          }
        )

        streamifier.createReadStream(fileBuffer).pipe(stream)
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Upload failed:', error.message)
      }
      return null
    }
  }

  async deleteByUrl(imageUrl: string): Promise<boolean> {
    try {
      const publicId = this.extractPublicIdFromUrl(imageUrl)
      const result = await cloudinary.uploader.destroy(`DhanaShree/${publicId}`)
      return result.result === 'ok'
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    }
  }

  private extractPublicIdFromUrl(imageUrl: string): string {
    const parts = imageUrl.split('/')
    const publicIdWithExtension = parts[parts.length - 1]
    return publicIdWithExtension.split('.')[0]
  }
}

export default new CloudinaryService()
