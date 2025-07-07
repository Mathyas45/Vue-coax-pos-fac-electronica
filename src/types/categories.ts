export type Categorie = {
    id:string,
    name:string,
    description?:string,
    state:number,
    image:string,
    created_at:string
}
export type Categories = {
    total: number,
    paginate: number,
    categories: Categorie[]
}
export type CategorieResponse = {
    message:string,
    code?:number,
    categorie?: Categorie,
}