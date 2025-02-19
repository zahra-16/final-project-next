describe("Halaman Pelanggan", () => {
    it("Kunjungi Halaman Pelanggan", () => {
        cy.visit("/pelanggan");
        cy.get("#detail").click();
        cy.wait(1000)
        cy.get("#close").click();
    })
})