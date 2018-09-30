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
# -------------------------- unit test for successfully deleted data -----------------------------------

    def test_delete(self):
        response = self.appli.delete('/todo/api/v1.0/task/delete/30',data=json.dumps(dict({'title':'Ali', 'description' : 'Ali'})), content_type = 'application/json')
        self.assertEqual(response.status_code, 200, "OK")



