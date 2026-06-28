export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        // Voeg de data toe aan de D1 database (gekoppeld via de naam DB)
        const { success } = await context.env.DB.prepare(
            `INSERT INTO evaluations (
        role, role_other, q1_1_realism, q1_2_example, q1_3_insights,
        q2_1_tone, q2_2_emphasis, q2_3_scenario, q3_1_mechanic,
        q3_2_balance, q3_3_explanation, q4_1_discussion,
        q4_2_improvement, q4_3_facilitation, other_comments, consent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            data.role, data.role_other, data.q1_1_realism, data.q1_2_example, data.q1_3_insights,
            data.q2_1_tone, data.q2_2_emphasis, data.q2_3_scenario, data.q3_1_mechanic,
            data.q3_2_balance, data.q3_3_explanation, data.q4_1_discussion,
            data.q4_2_improvement, data.q4_3_facilitation, data.other_comments, data.consent === 'on' ? 1 : 0
        ).run();

        if (success) {
            return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Database insert failed' }), { status: 500 });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
