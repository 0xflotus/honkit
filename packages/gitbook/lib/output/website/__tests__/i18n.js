var createMockOutput = require("../../testing/createMock");
var prepareI18n = require("../prepareI18n");
var createTemplateEngine = require("../createTemplateEngine");

var WebsiteGenerator = require("../");

describe("i18n", () => {
    test("should correctly use english as default language", () => {
        return createMockOutput(WebsiteGenerator, {
            "README.md": "Hello World",
        })
            .then(function (output) {
                return prepareI18n(output);
            })
            .then(function (output) {
                var engine = createTemplateEngine(output, "README.md");
                var t = engine.getFilters().get("t");

                expect(t("SUMMARY_INTRODUCTION")).toEqual("Introduction");
            });
    });

    test("should correctly use language from book.json", () => {
        return createMockOutput(WebsiteGenerator, {
            "README.md": "Hello World",
            "book.json": JSON.stringify({ language: "fr" }),
        })
            .then(function (output) {
                return prepareI18n(output);
            })
            .then(function (output) {
                var engine = createTemplateEngine(output, "README.md");
                var t = engine.getFilters().get("t");

                expect(t("GITBOOK_LINK")).toEqual("Publié avec GitBook");
            });
    });
});
