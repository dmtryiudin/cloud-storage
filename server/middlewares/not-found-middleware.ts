import { ApiError } from "../exceptions/api-error";

export default function () {
  throw ApiError.NotFound();
}
