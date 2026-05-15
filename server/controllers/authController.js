import Aluno from "../models/Aluno.js";
import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { matricula, senha } = req.body;

        const user = await Aluno.findOne({ matricula });

        if (!user) {
            return res.status(401).json({ msg: "Usuário não encontrado" });
        }

        const senhaValida = await comparePassword(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ msg: "Senha inválida" });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                nome: user.nome
            }
        });

    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor" });
    }
};