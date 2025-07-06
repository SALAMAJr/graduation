"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSearchHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_search_history_dto_1 = require("./create-search-history.dto");
class UpdateSearchHistoryDto extends (0, swagger_1.PartialType)(create_search_history_dto_1.CreateSearchHistoryDto) {
}
exports.UpdateSearchHistoryDto = UpdateSearchHistoryDto;
//# sourceMappingURL=update-search-history.dto.js.map