import { countries } from "countries-list";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";
import tokenService from "../service/token-service";

export const saveToken = async (userDto: UserDto) => {
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const isCountryCodeValid = (country: string) => {
  if (!country) return true;
  return country in countries;
};

export const getFileBelongsToUser = async (
  fileName: string,
  userId?: string
) => {
  let file = await fileModel.findOne({
    href: `/file/download-protected/${fileName}`,
  });
  if (!file) {
    file = await fileModel.findOne({
      href: `/file/download/${fileName}`,
    });
  }
  if (!file) {
    throw ApiError.NotFound("File not found");
  }

  if (file.isPublic) {
    return file;
  }

  if (userId) {
    if (file.owner && file.owner.toString() === userId) {
      return file;
    }

    if (!file.folder) {
      throw ApiError.Forbidden("You don't own this file");
    }

    const fileFolder = await folderModel.findById(file.folder);
    if (fileFolder!.owner === userId) {
      return file;
    }
  }

  throw ApiError.Forbidden("You don't own this file");
};

export const setFileBelongsToUser = async (
  fileName: string,
  userId?: string
) => {
  let file = await fileModel.findOne({
    href: `/file/download-protected/${fileName}`,
  });
  if (!file) {
    file = await fileModel.findOne({
      href: `/file/download/${fileName}`,
    });
  }
  if (!file) {
    throw ApiError.NotFound("File not found");
  }

  if (userId) {
    if (file.owner && file.owner.toString() === userId) {
      return file;
    }

    if (!file.folder) {
      throw ApiError.Forbidden("You don't own this file");
    }

    const fileFolder = await folderModel.findById(file.folder);
    if (fileFolder!.owner === userId) {
      return file;
    }
  }

  throw ApiError.Forbidden("You don't own this file");
};

export const getFilesForFolder = async (folderId: string) => {
  const files = await fileModel.find({ folder: folderId });
  return files;
};
