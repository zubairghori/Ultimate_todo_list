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
# -------------------------- unit test for successfully updated data -----------------------------------

    def test_update(self):    
        response = self.appli.put('/todo/api/v1.0/task/update/30',data=json.dumps(dict({'title':'Ali', 'description' : 'Ali'})), content_type = 'application/json')
        self.assertEqual(response.status_code, 200, "OK")
# -------------------------- unit test for without json form -------------------------------------

    def test_update_without_json(self):
        response = self.appli.put('/todo/api/v1.0/task/update/30')
        self.assertEqual(response.status_code, 200, "OK")



if __name__ == "__main__":
    unittest.main()
# -*- coding: utf-8 -*-

