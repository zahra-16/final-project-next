describe("Halaman Penyewaan", () => {
    it("Kunjungi Halaman Penyewaan", () => {
        cy.visit("/penyewaan");
        cy.get("#detail").click();
        cy.wait(1000)
        cy.get("#close").click();
    })
})