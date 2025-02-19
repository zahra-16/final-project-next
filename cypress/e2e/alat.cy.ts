describe("Halaman Tools", () => {
    it("Kunjungi Halaman Tools", () => {
        cy.visit("/alat");
        cy.get('[name="Alat"]').click();
        cy.get('[name="nama"]').type("Lampu");
        cy.get('[name="deskripsi"]').type("Alat untuk Pencahayaan dan menyinari");
        cy.get('[name="harga"]').type("2000");
        cy.get('[name="stok"]').type("20");
        cy.get('[name="kategori"]').type("21");
        cy.get('[name="tambah"]').click();
        cy.get("#alat").click();
        cy.get("#detail").click();
    })
})