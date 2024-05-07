import type { Actions, PageServerLoad } from "./$types"
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/drizzle/db";
import { Account } from "$lib/server/drizzle/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async () => {
    return {
        accounts: await db.select().from(Account)
    }
};

export const actions: Actions = {
    createUser: async ({ request }) => {
        let { user, money } = Object.fromEntries(await request.formData()) as unknown as { user: string, money: Number };
        

        try {
            if (!user) {
                user = "[Senza nome]";
            }
            await db.insert(Account).values({ 
                user, 
                money: Number(money) 
            })
        } catch (err) {
            console.error(err)
            return fail(500, { error: 'Could not create user.' })
        }

        return { status: 201 }
    },

    updateUser: async ({ url }) => {
        const id = url.searchParams.get('id');
        let money = Number(url.searchParams.get('money'));
        const initialQty = url.searchParams.get('qty');
        const mode = url.searchParams.get('mode');
        if (!id || !initialQty || !mode) {
            return fail(400, { error: 'Invalid request' });
        }

        if (!money) {
            const account = await db.select({ money: Account.money }).from(Account).where(eq(Account.id, Number(id)))

            money = account[0].money ?? 0;
        }

        try {
            if (mode === 'add') {
                const qty = Number(money) + Number(initialQty)

                await db.update(Account).set({ money: Number(qty) }).where(eq(Account.id, Number(id)))
            } else if (mode === 'remove') {
                const qty = Number(money) - Number(initialQty)

                await db.update(Account).set({ money: Number(qty) }).where(eq(Account.id, Number(id)))
            } else if (mode === 'set') {
                const qty = Number(initialQty)

                await db.update(Account).set({ money: Number(qty) }).where(eq(Account.id, Number(id)))
            } else {
                return fail(400, { error: 'Invalid request' });
            }
        } catch (err) {
            console.error(err)
            return fail(500, { error: 'Could not update user.' })
        }
            
        return { status: 200 }
    },

    deleteUser: async ({ url }) => {
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { error: 'Invalid request' });
        }

        try {
            await db.delete(Account).where(eq(Account.id, Number(id)))
        } catch (err) {
            console.error(err)
            return fail(500, { error: 'Could not delete user.' })
        }
        return { status: 200 }
    },

    // WIP

    // searchUser: async ({ url }) => {
    //     const id = url.searchParams.get('id');
    //     if (!id) {
    //         return fail(400, { error: 'Invalid request' });
    //     }

    //     try {
    //         const accounts = await prisma.account.findMany({
    //             where: {
    //                 id: Number(id)
    //             }
    //         })
    //         console.log([accounts])
    //         return { accounts }
            
    //     } catch (err) {
    //         console.error(err)
    //         return fail(500, { error: 'Could not search user.' })
    //     }
    // }
};