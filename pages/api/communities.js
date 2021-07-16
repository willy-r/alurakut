// BFF - Backend For Frontend

import { SiteClient } from 'datocms-client';


const client = new SiteClient(process.env.NEXT_PUBLIC_API_TOKEN);
const itemID = '967554';

export default async function communitiesRequestsHandler(req, res) {
  if (req.method == 'POST') {
    const newCommunity = await client.items.create({
      itemType: itemID,
      ...req.body,
    });

    res.json(newCommunity);
  }

  if (req.method == 'GET') {
    const communities = await client.items.all({
      'filter[type]': itemID,
      version: 'published',
    }, {
      allPages: true,
    });
    
    res.json(communities);
  }
}
