import { login } from "../support/commands";
import "cypress-file-upload";

describe("testing admin", () => {
  beforeEach(() => {
    login();
  });

  it("should create appointment", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("POST", "/createAppointment", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Agendamento"]', { timeout: 5000 }).click();
    cy.get('[data-cy="appointment-page"]').should("exist");
    cy.get('input[name="hour24"]').eq(0).click().type("20");
    cy.get('input[name="minute"]').eq(0).click().type("00");
    cy.get('input[name="hour24"]').eq(1).click({ force: true }).type("22");
    cy.get('input[name="minute"]').eq(1).click().type("00");
    cy.get('[data-cy="Crie um horário para busca e delivery"]').click();
    cy.contains("Horário criado").should("exist");
  });

  it("should set restaurant to be close", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateIsOpen", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Agendamento"]', { timeout: 5000 }).click();
    cy.get('[data-cy="appointment-page"]').should("exist");
    cy.get('[data-cy="updateIsOpen"]').click();
    cy.contains("Atualizado").should("exist");
  });

  it("should update product", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateProduct/*", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Produtos").click();
    cy.get("#radix-\\:r2\\:").click();
    cy.contains("Atualizar").click();
    cy.contains("Editar").should("exist");
    cy.get("#\\:rr\\:-form-item").click().type(" atualizado");
    cy.get("#\\:rv\\:-form-item").click().type("20");
    cy.get('[data-cy="submit"]').click();
    cy.contains("Produto atualizado").should("exist");
  });

  it("should create product", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    }).as("currentUser");
    cy.intercept("POST", "/create", {
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "https://widget.cloudinary.com/info/dnhy6fqpj.json?sources[]=local&sources[]=url&uploadPreset=1&uploadPrefix=0&secure=1&folder=0&maxFiles=0&cropping=0&inlineMode=0&defaultSource=0&multiple=0&googleApiKey=0&dropboxAppKey=0&facebookAppId=0&instagramServer=0&shutterstockServer=0&istockServer=0&gettyServer=0&searchBySites=0&searchByRights=0&publicId=0&autoMinimize=0&requirePrepareParams=0&useTagsCallback=0&useUploadPresetsCallback=0&useMetadataCallback=0&text=0&language=1&showAdvancedOptions=0&showPoweredBy=1&showCompletedButton=0&showInsecurePreview=0&styles=0&croppingShowBackButton=1&croppingCoordinatesMode=1&croppingDefaultSelectionRatio=1&croppingShowDimensions=0&theme=0&tabInsideWidget=1&apiKey=0&resourceType=1&usePreBatchCallback=0&clientAllowedFormats=1&maxFileSize=1&maxImageFileSize=1&maxVideoFileSize=1&debug=0&showUploadMoreButton=1&singleUploadAutoClose=1&showSkipCropButton=1&version=2-1.66.23&browser=Chrome-116&device=desktop&os=Windows-10&source=uw",
      { statusCode: 200 }
    ).as("cloud");
    cy.intercept(
      "GET",
      "https://widget.cloudinary.com/info/dnhy6fqpj.json?sources[]=local&sources[]=url&uploadPreset=1&uploadPrefix=0&secure=1&folder=0&maxFiles=0&cropping=0&inlineMode=0&defaultSource=0&multiple=0&googleApiKey=0&dropboxAppKey=0&facebookAppId=0&instagramServer=0&shutterstockServer=0&istockServer=0&gettyServer=0&searchBySites=0&searchByRights=0&publicId=0&autoMinimize=0&requirePrepareParams=0&useTagsCallback=0&useUploadPresetsCallback=0&useMetadataCallback=0&text=0&language=1&showAdvancedOptions=0&showPoweredBy=1&showCompletedButton=0&showInsecurePreview=0&styles=0&croppingShowBackButton=1&croppingCoordinatesMode=1&croppingDefaultSelectionRatio=1&croppingShowDimensions=0&theme=0&tabInsideWidget=1&apiKey=0&resourceType=1&usePreBatchCallback=0&clientAllowedFormats=1&maxFileSize=1&maxImageFileSize=1&maxVideoFileSize=1&debug=0&showUploadMoreButton=1&singleUploadAutoClose=1&showSkipCropButton=1&version=2-1.66.23&browser=Chrome-116&device=LG-Nexus%205&os=Android-6.0&source=uw",
      { statusCode: 200 }
    );
    cy.intercept(
      "POST",
      " https://api.cloudinary.com/v1_1/dnhy6fqpj/image/upload",
      {
        statusCode: 200,
        body: {
          asset_id: "b095aca088dc74fd880b2828e29680b3",
          public_id: "yokuhvyap9uw7dnfh9lp",
          version: 1695379791,
          version_id: "0fe34fba6b28b75e37b34d8e0c5d50d1",
          signature: "52cb11893a0392b6a91bd0c317400c38d4238495",
          width: 740,
          height: 494,
          format: "jpg",
          resource_type: "image",
          created_at: "2023-09-22T10:49:51Z",
          tags: [],
          bytes: 100819,
          type: "upload",
          etag: "739d697a0328f35958e3bbbbfe9bf3e4",
          placeholder: false,
          url: "http://res.cloudinary.com/dnhy6fqpj/image/upload/v1695379791/yokuhvyap9uw7dnfh9lp.jpg",
          secure_url:
            "https://res.cloudinary.com/dnhy6fqpj/image/upload/v1695379791/yokuhvyap9uw7dnfh9lp.jpg",
          folder: "",
          access_mode: "public",
          original_filename: "real morango",
        },
      }
    ).as("upload");

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Produtos").click();
    cy.contains("Adicione novo produto", { timeout: 50000 }).click();
    cy.contains("Criar").should("exist");
    cy.wait("@cloud");
    cy.get("iframe").then(($ele) => {
      const file = $ele.contents().find('input[type="file"]');
      const fileName = "açai.jpg";
      cy.fixture(fileName).then((fileContent) => {
        cy.wrap(file, { timeout: 9000 }).attachFile(fileName, fileContent);
      });
    });
    cy.wait("@upload");
    cy.get("#\\:rn\\:-form-item").click().type("Moranguinho");
    cy.get("#\\:rp\\:-form-item").click().type("Morango delicia");
    cy.get("#\\:rr\\:-form-item").click().type("120");
    cy.get("#\\:rt\\:-form-item").click();
    cy.get('[data-cy="Açai"]').click();
    cy.get('[data-cy="submit"]').click();
    cy.contains("Produto criado");
  });

  it("should update topping", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateTopping/*", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Toppings").click();
    cy.get("#radix-\\:r2\\:").click();
    cy.contains("Atualizar").click();
    cy.contains("Editar").should("exist");
    cy.get("#\\:rf\\:-form-item").click().type("atualizado");
    cy.get("#\\:rj\\:-form-item").click().type("20");
    cy.contains("Salvar mudanças").click();
    cy.contains("Topping atualizado").should("exist");
  });

  it("should create a topping", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("POST", "/createTopping", {
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "https://widget.cloudinary.com/info/dnhy6fqpj.json?sources[]=local&sources[]=url&uploadPreset=1&uploadPrefix=0&secure=1&folder=0&maxFiles=0&cropping=0&inlineMode=0&defaultSource=0&multiple=0&googleApiKey=0&dropboxAppKey=0&facebookAppId=0&instagramServer=0&shutterstockServer=0&istockServer=0&gettyServer=0&searchBySites=0&searchByRights=0&publicId=0&autoMinimize=0&requirePrepareParams=0&useTagsCallback=0&useUploadPresetsCallback=0&useMetadataCallback=0&text=0&language=1&showAdvancedOptions=0&showPoweredBy=1&showCompletedButton=0&showInsecurePreview=0&styles=0&croppingShowBackButton=1&croppingCoordinatesMode=1&croppingDefaultSelectionRatio=1&croppingShowDimensions=0&theme=0&tabInsideWidget=1&apiKey=0&resourceType=1&usePreBatchCallback=0&clientAllowedFormats=1&maxFileSize=1&maxImageFileSize=1&maxVideoFileSize=1&debug=0&showUploadMoreButton=1&singleUploadAutoClose=1&showSkipCropButton=1&version=2-1.66.23&browser=Chrome-116&device=desktop&os=Windows-10&source=uw",
      { statusCode: 200 }
    ).as("cloud");
    cy.intercept(
      "GET",
      "https://widget.cloudinary.com/info/dnhy6fqpj.json?sources[]=local&sources[]=url&uploadPreset=1&uploadPrefix=0&secure=1&folder=0&maxFiles=0&cropping=0&inlineMode=0&defaultSource=0&multiple=0&googleApiKey=0&dropboxAppKey=0&facebookAppId=0&instagramServer=0&shutterstockServer=0&istockServer=0&gettyServer=0&searchBySites=0&searchByRights=0&publicId=0&autoMinimize=0&requirePrepareParams=0&useTagsCallback=0&useUploadPresetsCallback=0&useMetadataCallback=0&text=0&language=1&showAdvancedOptions=0&showPoweredBy=1&showCompletedButton=0&showInsecurePreview=0&styles=0&croppingShowBackButton=1&croppingCoordinatesMode=1&croppingDefaultSelectionRatio=1&croppingShowDimensions=0&theme=0&tabInsideWidget=1&apiKey=0&resourceType=1&usePreBatchCallback=0&clientAllowedFormats=1&maxFileSize=1&maxImageFileSize=1&maxVideoFileSize=1&debug=0&showUploadMoreButton=1&singleUploadAutoClose=1&showSkipCropButton=1&version=2-1.66.23&browser=Chrome-116&device=LG-Nexus%205&os=Android-6.0&source=uw",
      { statusCode: 200 }
    );
    cy.intercept(
      "POST",
      " https://api.cloudinary.com/v1_1/dnhy6fqpj/image/upload",
      {
        statusCode: 200,
        body: {
          asset_id: "b095aca088dc74fd880b2828e29680b3",
          public_id: "yokuhvyap9uw7dnfh9lp",
          version: 1695379791,
          version_id: "0fe34fba6b28b75e37b34d8e0c5d50d1",
          signature: "52cb11893a0392b6a91bd0c317400c38d4238495",
          width: 740,
          height: 494,
          format: "jpg",
          resource_type: "image",
          created_at: "2023-09-22T10:49:51Z",
          tags: [],
          bytes: 100819,
          type: "upload",
          etag: "739d697a0328f35958e3bbbbfe9bf3e4",
          placeholder: false,
          url: "http://res.cloudinary.com/dnhy6fqpj/image/upload/v1695379791/yokuhvyap9uw7dnfh9lp.jpg",
          secure_url:
            "https://res.cloudinary.com/dnhy6fqpj/image/upload/v1695379791/yokuhvyap9uw7dnfh9lp.jpg",
          folder: "",
          access_mode: "public",
          original_filename: "real morango",
        },
      }
    ).as("upload");

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Toppings").click();
    cy.contains("Adicione novo topping", { timeout: 50000 }).click();
    cy.contains("Criar").should("exist");
    cy.wait("@cloud");
    cy.get("iframe").then(($ele) => {
      const file = $ele.contents().find('input[type="file"]');
      const fileName = "açai.jpg";
      cy.fixture(fileName).then((fileContent) => {
        cy.wrap(file, { timeout: 9000 }).attachFile(fileName, fileContent);
      });
    });
    cy.wait("@upload");
    cy.get("#\\:rb\\:-form-item").click().type("Morango");
    cy.get("#\\:rd\\:-form-item").click().type("Morango delicia");
    cy.get("#\\:rf\\:-form-item").click().type("120");
    cy.get("#\\:rh\\:-form-item").click();
    cy.get('[data-cy="Açai 300 ml"]').click();
    cy.get('[data-cy="submit"]').click();
    cy.contains("Topping criado");
  });

  it("should update category", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateCategory/*", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Categorias").click();
    cy.get("#radix-\\:r2\\:").click();
    cy.contains("Atualizar").click();
    cy.contains("Editar", { timeout: 50000 }).should("exist");
    cy.get("#\\:rh\\:-form-item").click().type("atualizado");
    cy.contains("Salvar mudanças").click();
    cy.contains("Categoria atualizada").should("exist");
  });

  it("should create a category", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("POST", "/createCategory", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Categorias").click();
    cy.contains("Adicione uma categoria", { timeout: 50000 }).click();
    cy.contains("Criar").should("exist");
    cy.get("#\\:rd\\:-form-item").click().type("Doces");
    cy.get('[data-cy="submit"]').click();
    cy.contains("Categoria criada");
  });
});
