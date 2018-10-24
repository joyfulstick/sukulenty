import { API_KEY, API_SECRET } from '../cloudinaryEnv'
import hex from 'crypto-js/enc-hex'
import sha1 from 'crypto-js/sha1'

const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.^\s]+)(?:\.(.+))?$/

const getPublicId = url => CLOUDINARY_REGEX.exec(url)[4]

const timestamp = +new Date()

function createSignature(url) {
  return hex.stringify(
    sha1(`public_id=${getPublicId(url)}&timestamp=${timestamp}${API_SECRET}`),
  )
}

export { getPublicId, timestamp, createSignature, API_KEY }
