import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        accounts: await global.prisma.account.findMany()
    }
};

export const actions: Actions = {
    createUser: async ({ request }) => {
        let { user, money } = Object.fromEntries(await request.formData()) as unknown as { user: string, money: Number };
        

        try {
            if (!user) {
                user = "[Senza nome]";
            }
            await global.prisma.account.create({
                data: {
                    user,
                    money: Number(money)
                }
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
            const account = await global.prisma.account.findUnique({
                where: {
                    id: Number(id)
                }
            })

            money = account?.money ?? 0;
        }

        try {
            if (mode === 'add') {
                const qty = Number(money) + Number(initialQty)

                await global.prisma.account.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        money: Number(qty)
                    }
                })
            } else if (mode === 'remove') {
                const qty = Number(money) - Number(initialQty)

                await global.prisma.account.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        money: Number(qty)
                    }
                })
            } else if (mode === 'set') {
                const qty = Number(initialQty)

                await global.prisma.account.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        money: Number(qty)
                    }
                })
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
            await global.prisma.account.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, { error: 'Could not delete user.' })
        }
        return { status: 200 }
    },

    searchUser: async ({ url }) => {
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { error: 'Invalid request' });
        }

        try {
            const accounts = await global.prisma.account.findMany({
                where: {
                    id: Number(id)
                }
            })
            console.log([accounts])
            return { accounts }
            
        } catch (err) {
            console.error(err)
            return fail(500, { error: 'Could not search user.' })
        }
    }
};