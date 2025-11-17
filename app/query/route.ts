// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
import { sql } from "../lib/db";
async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

// export async function GET() {
//   // return Response.json({
//   //   message:
//   //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
//   // });
//   try {
//     const data = Response.json(await listInvoices());
//     console.log(data);
//   	return data;
//   } catch (error) {
//   	return Response.json({ error }, { status: 500 });
//   }
// }
export async function GET() {
  try {
    const data = await listInvoices(); // получаем массив строк
    // console.log(data); // выведет [{ amount: 666, name: 'John' }, ...]
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Ошибка GET /api/invoices:', error);
    return new Response(JSON.stringify({ error: error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
