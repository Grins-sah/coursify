import { atom } from "recoil";
export const registerAtom = atom({
    default:false,
    key:"registerAtom"
})
export const msgAtom = atom({
    key:"msgAtom",
    default:""
})