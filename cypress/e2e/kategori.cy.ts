describe("Halaman Kategori", () => {
    it("Kunjungi Halaman Kategori", () => {
        cy.visit("/kategori");
        cy.get('[name="tambah"]').click();
        cy.get('[type="text"]').type("Alat Baru");
        cy.get('[name="submit"]').click();
    })
})