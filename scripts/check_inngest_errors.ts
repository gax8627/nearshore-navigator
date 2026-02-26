fetch('http://127.0.0.1:8288/api/runs')
  .then(res => res.json())
  .then(res => {
    const failed = res.data.filter((r: any) => r.status === 'Failed');
    console.log(`Found ${failed.length} failed runs.`);
    if (failed.length > 0) {
      console.log('Last Error:', JSON.stringify(failed[0].output, null, 2));
    }
  })
  .catch(console.error);
