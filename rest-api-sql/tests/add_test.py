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

# -------------------------- unit test for successfully added data -----------------------------------

    def test_add(self):
        response = self.appli.post('/todo/api/v1.0/task/add',data = json.dumps(dict({'title':'hello', 'description' : 'world', 'done':'True'})), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)


# -------------------------- unit test for without json form -------------------------------------

    def test_create_without_json(self):
        response = self.appli.post('/todo/api/v1.0/task/add')
        self.assertEqual(response.status_code, 400)

# -------------------------- unit test for invalid json form --------------------------------------

    def test_create_with_invalid_json(self):
        response = self.appli.post('/todo/api/v1.0/task/add',
                                 data=json.dumps(dict(status='changed')),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
