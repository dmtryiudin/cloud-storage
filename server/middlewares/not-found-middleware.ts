import { ApiError } from "../exceptions/api-error";

export default function () {
  throw ApiError.NotFound(
    `Not found, check out docs: ${process.env.API_URL}/api-docs/`
  );
}
