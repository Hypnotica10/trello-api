import { WHITELIST } from '~/utils/const'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

export const corsOptions = {
    origin: function (origin, callback) {
        // Nếu không có origin (ví dụ như Postman) thì cho phép tất cả các domain
        // Hoặc nếu là môi trường dev thì cũng cho phép tất cả các domain
        if (!origin && env.BUILD_MODE === 'dev') {
            return callback(null, true)
        }

        // Kiểm tra dem origin có phải là domain được chấp nhận hay không
        if (WHITELIST.includes(origin)) {
            return callback(null, true)
        }

        // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
        return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // CORS sẽ cho phép nhận cookies từ request
    credentials: true
}
