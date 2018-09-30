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


if __name__ == "__main__":
    unittest.main()
