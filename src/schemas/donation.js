import {z} from "zod"

export const createSchema = ({min, max}) => {
    return z.object({
        email: z.string({message: "Введите Email"}).min(1, "Введите Email").email('Некорректный Email'),
        comment: z.string()
            .max(255, "Максимальное количество знаков 255")
            .nullish(),
        is_terms_accepted: z.boolean(),
        amount: z.preprocess((val) => Number(val), z.number()
                .nullish()),
        custom_amount: z.preprocess((val) => Number(val), z.number()
            .nonnegative()
            .optional()
            .refine(
                (val) => {
                    // если пользователь ничего не ввёл, валидируем это отдельно (optional)
                    if (val === undefined || val === null || val === 0) {
                        return true;
                    }
                    return val >= min;
                }, {
                    message: `Введите сумму от ${min} ₽`
                }

            )
            .refine(
                (val) => {
                    // если пользователь ничего не ввёл, валидируем это отдельно (optional)
                    if (val === undefined || val === null || val === 0) {
                        return true;
                    }

                    return val <= max;

                }, {
                    message: `Введите сумму до ${max} ₽`
                }
            )
        ),
        is_recurrent: z.boolean().default(false),
        payment_method: z.string().min(1, 'Выберите способ оплаты')
    }).refine((data) => {
        return !(!data.amount && !data.custom_amount)
    }, {
        message: "Выберите или введите сумму пожертвования",
        path: ["custom_amount"],
    })
}