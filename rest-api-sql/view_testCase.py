import unittest
import os,sys ,json
from fetching_data import app

class apiViewTest(unittest.TestCase):
    def setUp(self):
        app.config['Testing'] = True
        app.config['Debug'] = False
        self.viewapp = app.test_client()

    def tearDown(self):
        pass


    def test_view(self):
        response = self.viewapp.get('/todo/api/v1.0/task/view', content_type = 'application/json')
        self.assertEqual(response.status_code,200)

    if __name__ == 'main':
        unittest.main()
