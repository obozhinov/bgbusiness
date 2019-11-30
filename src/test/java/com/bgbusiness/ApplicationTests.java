package com.bgbusiness;

import com.bgbusiness.model.Business;
import com.bgbusiness.repository.AddressRepository;
import com.bgbusiness.repository.BusinessRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private BusinessRepository businessRepository;

	@MockBean
	private AddressRepository addressRepository;

	@Test
	void contextLoads() {
	}

	@Test
	@Order(1)
	public void createABusinessTest() throws Exception {
		/**
		 *
		 * Create product with id 1
		 *
		 * The request body is:
		 * {
		 *     "id": 1,
		 *     "name": "Olya and Marina Media",
		 *     "description": "A new media company, creating content for woman under different formats, primary podcasts.",
		 *     "hiring": false
		 * }
		 */
		String json = "{\"id\": 1, \"name\": \"Olya and Marina Media\", \"description\": \"A new media company, creating content for woman under different formats, primary podcasts.\", \"hiring\": false}";
//		Business business = new Business();
//		business.setId(1L);
//		business.setName("Olya and Marina Media");
//		business.setDescription("A new media company, creating content for woman under different formats, primary podcasts.");
//		business.setHiring(false);
//		when(businessRepository.save(business)).thenReturn(HttpStatus.CREATED);
		mockMvc.perform(
				post("/business")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json)
		)
				.andExpect(status().isCreated());
	}

}
