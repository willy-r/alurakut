// BFF - Backend For Frontend

import { SiteClient } from 'datocms-client';


const client = new SiteClient(process.env.NEXT_PUBLIC_API_TOKEN);
const itemID = '972780';

export default async function scrapsRequestsHandler(req, res) {
  if (req.method == 'POST') {
    const newScrap = await client.items.create({
      itemType: itemID,
      ...req.body,
    });

    res.json(newScrap);
  }

  if (req.method == 'GET') {
    const scraps = await client.items.all({
      'filter[type]': itemID,
      version: 'published',
    }, {
      allPages: true,
    });
    
    res.json(scraps);
  }
}
