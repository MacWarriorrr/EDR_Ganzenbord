export async function onRequestGet(context) {
    try {
        const password = context.request.headers.get('x-admin-password');
        const envPassword = context.env.ADMIN_PASSWORD;

        // Check if environment variable is set
        if (!envPassword) {
            return new Response(JSON.stringify({ error: 'Beheerderswachtwoord is niet geconfigureerd op de server.' }), { status: 500 });
        }

        // Validate password
        if (password !== envPassword) {
            return new Response(JSON.stringify({ error: 'Onjuist wachtwoord.' }), { status: 401 });
        }

        // Fetch data
        const { results } = await context.env.DB.prepare(
            `SELECT * FROM evaluations`
        ).all();

        return new Response(JSON.stringify({ data: results }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
