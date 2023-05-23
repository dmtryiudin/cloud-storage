import { ApiError } from "../exceptions/api-error";

export default function () {
  throw ApiError.NotFound(`Not found, docs: ${process.env.API_URL}/api-docs/`);
}
