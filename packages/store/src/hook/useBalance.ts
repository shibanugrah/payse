import {userecoilValue} from "recoil"
import { balanceAtom } from "../atoms/balance"

export const useBalance = () => {
                const value = userecoilValue(balanceAtom)
                return value
}