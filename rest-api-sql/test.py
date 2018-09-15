import unittest
import os
import sys, json
from todo_app_sql_db import app

class apiTest(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        self.appli = app.test_client()

    def tearDown(self):
        pass

    def test_add(self):    # test function for add
        response = self.appli.post('/todo/api/v1.0/task/add',data=json.dumps(dict({'title':'ALi', 'description' : 'Ahmed'})), content_type='application/json')
        self.assertEqual(response.status_code, 200, "OK")

    # test function for view
    def test_view(self):
        response = self.viewapp.get('/todo/api/v1.0/task/view', content_type = 'application/json')
        self.assertEqual(response.status_code,200)


    def test_update(self):   # test function for update 
        response = self.appli.put('/todo/api/v1.0/task/update/30',data=json.dumps(dict({'title':'Ali', 'description' : 'Ali'})), content_type = 'application/json')
        self.assertEqual(response.status_code, 200, "OK")

    

if __name__ == "__main__":
    unittest.main()
