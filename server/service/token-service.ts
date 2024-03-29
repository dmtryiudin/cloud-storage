import jwt from "jsonwebtoken";
import { UserDto } from "../dtos/user-dto";
import tokenModel from "../models/token-model";

class TokenService {
  generateTokens(payload: UserDto) {
    const { id, login, email } = payload;
    const updatedPayload = {
      id,
      login,
      email,
    };
    const accessToken = jwt.sign(
      updatedPayload,
      process.env.JWT_SECRET_ACCESS!,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      updatedPayload,
      process.env.JWT_SECRET_REFRESH!,
      {
        expiresIn: "14d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = tokenModel.findOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH!);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
